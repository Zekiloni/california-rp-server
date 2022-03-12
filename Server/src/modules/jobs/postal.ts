import { JobConfig } from '@configs/jobs.config';
import { jobs } from '@models';


const postal = new jobs(
   JobConfig.job.POSTAL,
   JobConfig.names.POSTAL,
   JobConfig.descriptions.POSTAL,
   JobConfig.positions.POSTAL,
   JobConfig.sprites.POSTAL,
   JobConfig.colors.POSTAL
);


postal.start = function (player: PlayerMp) {

};


postal.stop = function (player: PlayerMp, finished: boolean, delivered: number) {

};