import { Commands } from '../commands';
import { cmds, colors, Lang, none } from '@constants';
import { notifications } from '@enums';
import { Jobs } from '@models';
import { JobConfig } from '@configs';
import { taxi } from '../../models/jobs/taxi';
import { electrician } from '../../models/jobs/electrician';
import { postal } from '../../models/jobs/postal';


Commands[cmds.names.TAKE_JOB] = {
   description: cmds.descriptions.TAKE_JOB,
   call (player: PlayerMp) {
      if (!player.character.isUnemployed) {
         player.notification(Lang.ALREADY_HAVE_JOB, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const job = Jobs.nearest(player, 3);

      if (!job) {
         player.notification(Lang.NOT_NEAR_ANY_JOB, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      job.employ(player);
   }
};

Commands[cmds.names.QUIT_JOB] = {
   description: cmds.descriptions.QUIT_JOB,
   job: { required: true },
   call (player: PlayerMp) {
      if (player.character.working) {
         return;
      }

      player.character.setJob(player, none);
   }
}


Commands[cmds.names.POSTAL] = {
   description: 'Započni / prekini posao poštara.',
   job: {
      required: true,
      id: JobConfig.job.POSTAL
   },
   call (player: PlayerMp) {
      if (!player.character.working) {
         postal.start(player);
      } else {
         postal.stop(player);
      }
   }
}

Commands[cmds.names.BUS_ROUTES] = {
   description: cmds.descriptions.BUS_ROUTES,
   job: { required: true, id: JobConfig.job.BUS_DRIVER },
   call (player: PlayerMp) {
      for (const i in JobConfig.busRoutes) {
         const route = JobConfig.busRoutes[i];
        player.message((i + 1) + '. ' + route.name + 'broj stanica: ' + route.points.length, colors.hex.Info);
      }
   }
}

Commands[cmds.names.CHOOSE_ROUTE] = {
   description: cmds.descriptions.CHOOSE_ROUTE,
   job: { required: true, id: JobConfig.job.BUS_DRIVER },
   params: [
      cmds.params.BUS_ROUTE
   ],
   call (player: PlayerMp, route: string) {

      if (player.character.working) {
         player.notification(Lang.U_ALREADY_WORKING, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const job = Jobs.list.find(job => job.id == player.character.job);

      if (!job) { 
         return;
      }
      
      if (job.start) {
         job.start(player, Number(route));
      }
   }
}


Commands[cmds.names.TAXI_JOB] = {
   description: cmds.descriptions.TAXI_JOB,
   job: { 
      required: true, 
      id: JobConfig.job.TAXI 
   },
   call (player: PlayerMp) {
      taxi.menu(player);
   }
}

Commands[cmds.names.ELECTRICITY] = {
   description: cmds.descriptions.ELECTRICITY,
   job: {
      required: true,
      id: JobConfig.job.ELECTRICIAN
   },
   call (player: PlayerMp) {
      electrician.start(player);
   }
}