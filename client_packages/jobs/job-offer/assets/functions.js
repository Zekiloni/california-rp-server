
var jobId = null;

jobOffer = (jobID, jobName, jobLoc, jobDesc) => { 
    jobId = parseInt(jobID);
    $('#jobLoc').html(jobLoc);
    $('#jobName').html(jobName);
    $('#jobDesc').html(jobDesc);
}

jobOffer(1, 'Vozac Autobusa', 'Los Santos Autobuska Stanica', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas erat sem, congue id metus ut, ultrices dapibus lorem. Fusce quis nibh ut diam porta porta vel vitae leo.')


$(window).on('load', function() { $('.box').fadeIn(1000) })


document.addEventListener("keyup", function(e) {
    if (e.keyCode === 27) {
        closeJob();
    }
})

acceptJob = () => { 
    job = parseInt(jobId); 
    mp.trigger('client:acceptJobOffer', job); 
    closeJob(); 
}

closeJob = () => { mp.trigger('client:closeJobOffer'); }