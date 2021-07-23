import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, DefaultScope } from 'sequelize-typescript';
import { Messages } from '../Globals/Messages';
import { Main } from '../Server/Main';
import { ItemRegistry } from '../Items/Items.Registry';
import BusinessTypes from '../data/Businesses.json';
import Vehicles from '../data/Vehicles.json';
import { Settings } from '../Server/Settings';
import { Colors } from '../Globals/Colors';

class Business extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    ID: number

    @Column
    Name: string

    @Column
    Type: number

    @Column
    @Default(false)
    Locked: boolean

    @Column
    Walk_In: string

    @Column
    Price: number

    @Column
    Owner: number

    @Column
    @Default(0)
    Budget: number

    @Column
    @Default(0)
    Dimension: number

    @Column
    IPL: string

    @Column
    Sprite: number

    @Column
    Color: number

    @Column
    @Default([])
    Workers: string[]

    @Column
    @Default([])
    Products: object[]

    @Column
    Position: Vector3Mp

    @Column
    Vehicle_Point: Vector3Mp

    @Column
    Interior_Position: Vector3Mp

    @Column
    @UpdatedAt
    Created_At: Date;

    @Column
    @UpdatedAt
    Updated_At: Date;

    static async New(Player: PlayerMp, Type: number, WalkIn: boolean, Price: number) {

        if (!BusinessTypes[Price]) return;

        const Position = Player.position;
        const Dimension = Player.dimension;
        const Walk_in = WalkIn == true ? true : false;
        const Default: any = BusinessTypes[Type];
        let Products: any = {};

        if (Default.products) {
            for (const i in Default.products) {
                let multiplier = Default.products[i];
                Products[i] = { multiplier: multiplier, supplies: Settings.Business.Default.Supplies }; // '\"' + i + '\"'
            }
        }

        console.log(Products)

        const NewBiz = await Business.create({ Name: Default.name, Type: Type, Price: Price, Walk_in: Walk_in, Products: Products, Position: Position, Dimension: Dimension });
        if (NewBiz) {
            // Log
        }
    };

    static async Nearest(player: PlayerMp) {
        const Businesses = await Business.findAll();
        for (const Business of Businesses) {
            const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
            if (player.dist(Position) < 2.5) return Business;
        }
    };


    static async GetNearestGasStation(player: PlayerMp) {
        const GasStations = await Business.findAll({ where: { Type: frp.Globals.Business.Types.GasStation } });
        for (const Station of GasStations) {
            const Position = new mp.Vector3(Station.Position.x, Station.Position.y, Station.Position.z);
            if (player.dist(Position) < 50) return Station;
        }
    };

    async Buy (player: PlayerMp) {
        const Character = await player.Character();
     
        if (this.Owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
        if (this.Price > Character.Money) return; // PORUKA: Nemate dovoljno novca
     
        this.Owner = Character.id;
        Character.GiveMoney(player, -this.Price);
        // PORUKA: Uspesno ste kupili biznis
        await this.save();
     };

    async Refresh() {

        const Info = BusinessTypes[this.Type];

        const Sprite = this.Sprite ? this.Sprite : Info.blip;

        if (this.GameObject == null) {
            const GameObjects = {
                colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 1.8, 2.0, 0),
                blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
                marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
                    color: [255, 255, 255, 1], // PROMENITI
                    rotation: new mp.Vector3(0, 0, 90),
                    visible: true,
                    dimension: this.Dimension
                })
            };


            GameObjects.colshape.OnPlayerEnter = (player) => {
                const Price = Main.Dollars(this.Price);
                const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
                const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';
                
                player.SendMessage('[Business] !{' + Colors.whitesmoke + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', Colors.property);
                player.SendMessage('[Business] !{' + Colors.whitesmoke + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', Colors.property);
                player.SendMessage((this.Walk_In ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy business' : ''), Colors.whitesmoke);
            };

            if (this.Color) {
                GameObjects.blip.color = this.Color;
            } else {
                if (Info.color) {
                    GameObjects.blip.color = Info.color;
                }
            }

            this.GameObject = GameObjects;
        } else {
            if (this.GameObject.blip) {
                this.GameObject.blip.sprite = this.Sprite ? this.Sprite : Info.blip;
                this.GameObject.blip.color = this.Color ? this.Color : Info.color;
            }
        }
    };

}