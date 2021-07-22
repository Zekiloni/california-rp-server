"use strict";
// require('../models/Business');
// const { VehicleEntities } = require('../models/Vehicle');
// const { ItemEntities } = require('./Items.Registry');
mp.events.add({
    'server:bussines.market:buy': async (Player, Total, Items, Biz) => {
        const Character = await Player.Character();
        if (Character.Money < Total)
            return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);
        Items = JSON.parse(Items);
        const Business = await frp.Business.findOne({ where: { id: Biz } });
        let Products = Business.Products;
        Items.forEach(Item => {
            if (Products[Item.name].supplies < Item.quantity)
                return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);
            frp.Items.New(Item.name, Item.quantity, ItemEntities.Player, Player.character);
            Products[Item.name].supplies -= Item.quantity;
        });
        Character.GiveMoney(Player, -Total);
        Business.increment('Budget', { by: Total });
        Business.Products = Products;
        await Business.save();
    },
    'server:business.drinks:buy': async (Player, Total, Item, Biz) => {
        const Character = await Player.Character();
        if (Character.Money < Total)
            return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);
        const Business = await frp.Business.findOne({ where: { id: Biz } });
        let Products = Business.Products;
        if (Products[Item].supplies < 1)
            return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);
        Products[Item].supplies--;
        frp.Items.New(Item, 1, ItemEntities.Player, Player.character);
        Character.GiveMoney(Player, -Total);
        Business.Products = Products;
        Business.increment('Budget', { by: Total });
        await Business.save();
    },
    'server:business.clothing:buy': async (player, Total, Items, Biz) => {
        const Character = await player.Character();
        if (Character.Money < Total)
            return player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);
        const Business = await frp.Business.findOne({ where: { id: Biz } });
        let Products = Business.Products;
        if (Products['Clothing'].supplies < 1)
            return player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);
        Items = JSON.parse(Items);
        Items.forEach(async (Item) => {
            const clothing = await frp.Items.New(Item.component, 1, ItemEntities.Player, player.character);
            clothing.Extra = { Drawable: Item.drawable, Texture: Item.texture };
            await clothing.save();
            Products['Clothing'].supplies--;
        });
        frp.Items.Equipment(player, Character.Gender);
        Character.GiveMoney(player, -Total);
        Business.Products = Products;
        Business.increment('Budget', { by: Total });
        await Business.save();
    },
    'server:business.dealership.vehicle:buy': async (Player, Total, Model, Color, Biz) => {
        Total = parseInt(Total);
        Color = JSON.parse(Color);
        const Character = await Player.Character();
        if (Character.Money < Total)
            return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 4);
        const Business = await frp.Business.findOne({ where: { id: Biz } });
        const VehiclePoint = Business.Vehicle_Point;
        if (frp.Main.IsAnyVehAtPos(new mp.Vector3(VehiclePoint.x, VehiclePoint.y, VehiclePoint.z), 1.5).length > 0)
            return;
        Player.Notification(frp.Globals.messages.VEHICLE_POINT_IS_NOT_FREE, frp.Globals.Notification.Error, 4);
        let Products = Business.Products;
        console.log(Products[Model]);
        if (Products[Model].supplies < 1)
            return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 4);
        Products[Model].supplies--;
        Character.GiveMoney(Player, -Total);
        Player.Notification(frp.Globals.messages.SUCCESSFULLY_BUYED_VEHICLE, frp.Globals.Notification.Succes, 6);
        Player.call('client:business.dealership:menu');
        Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);
        frp.Vehicles.Create(Model, VehicleEntities.Player, Character.id, new mp.Vector3(VehiclePoint.x, VehiclePoint.y, VehiclePoint.z), new mp.Vector3(0, 0, 0), Color);
        Business.Products = Products;
        Business.increment('Budget', { by: Total });
        await Business.save();
    }
});
