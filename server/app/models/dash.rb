class Dash < ActiveRecord::Base
	def redd
		subredd = self.subreddit
		reddit_api_url = "https://www.reddit.com/r/"+ subredd +".json"
		resp = Net::HTTP.get_response(URI.parse(reddit_api_url))
		data = resp.body
		result = JSON.parse(data)
		temp = []
		temp2 = []
		result["data"]["children"].each do |post|
			begin
				temp.push([post["data"]["preview"]["images"].first["source"], post["data"]["title"]])
			rescue
				puts "nope"
			end
		end


		# temp.each do |post|
		# 	self.build_post("reddit", post[0]["url"], post[1], post[0]["url"], post[0])
		# end

		return temp
	end	
end
