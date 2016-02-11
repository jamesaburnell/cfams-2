namespace :robot do
  desc "start twitter favoriting"
  task twitter_favorite: :environment do
  	time_now = Time.now
  	Dash.all.each do |dash|
  		automation_times = dash.automation_times
  		automation_times.each do |time|
  			if (time_now.utc - time.utc) < 10.minutes
  				dash.tweet_loop
  			end
  		end
  	end
  end
end
