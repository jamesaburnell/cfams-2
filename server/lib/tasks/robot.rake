namespace :robot do
  desc "start twitter favoriting"
  task twitter_favorite: :environment do
  	time_now = Time.now.getutc.seconds_since_midnight
  	Dash.all.each do |dash|
  		automation_times = dash.automation_times
  		automation_times.each do |time|
        time_when = time.start_time.seconds_since_midnight
        if (time_when - time_now).between?(-500, 500)
  				dash.robot_run
        end
  		end
  	end
  end
end
