namespace :robot do
  desc "start twitter favoriting"
  task twitter_favorite: :environment do
  	time_now = Time.now.getutc
  	Dash.all.each do |dash|
  		automation_times = dash.automation_times
  		automation_times.each do |time|
  			if (time_now.utc - time.start_time.utc) > 10.minutes
  				puts time_now.strftime("%I:%M%p")
  				puts time_now.utc - time.start_time.utc
  				dash.tweet_loop
  			end
  		end
  	end
  end
end
