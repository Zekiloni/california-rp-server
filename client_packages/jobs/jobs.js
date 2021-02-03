

const player = mp.players.local;
var jobOfferCEF;

mp.events.add({

   'client:showJobOffer': (jobId, jobName, jobLoc, jobDesc) => {
       jobOfferCEF = mp.browsers.new('package://jobs/job-offer/job.html');
       jobOfferCEF.execute(`jobOffer(\"${jobId}\", \"${jobName}\", \"${jobLoc}\",  \"${jobDesc}\");`); 
       setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:closeJobOffer': () => {
       jobOfferCEF.destroy();
       setTimeout(() => { mp.gui.cursor.show(false, false); }, 1000);
   },

   'client:acceptJobOffer': (jobId) => { 
      mp.events.callRemote('server:acceptJobOffer', parseInt(jobId));
   }
});
