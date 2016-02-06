class Dash < ActiveRecord::Base
	has_many :posts	
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
		temp.each do |post|
			self.build_post("reddit", post[0]["url"], post[1], post[0]["url"], post[0])
		end

		return temp
	end	
	def twitter_pic_scrape
		t = self.get_twit_client
		temp = []
		search_var = "#catsareassholes"
		t.search(search_var, ).take(100).collect do |tweet|
			unless tweet.media[0].nil?
				img = tweet.media[0].media_url
				puts img
				puts tweet.text
				temp.push(tweet.text, img)
				self.build_post("Twitter", img, tweet.text, img, img)
			end
		end	 		
	end


	# Auth Methods
	def get_twit_client
		twitCli = Twitter::REST::Client.new do |config|
		  config.consumer_key        = self.twit_consumer_key
		  config.consumer_secret     = self.twit_consumer_secret
		  config.access_token        = self.twit_access_token
		  config.access_token_secret = self.twit_access_token_secret
		end
		return twitCli
	end

	#Build Posts
	def build_post(title, src, body, image, author)
		p = self.posts.build(title: title, og_source: src, body: body, image_src: image)
		if p.title != "Twitter"
			# p.picture_from_url(p.image_src)
		else
			puts "no"
		end		
		p.save
	end

end


