class Dash < ActiveRecord::Base
	require 'open-uri'
	require 'net/http'
	require 'uri'
	belongs_to :user
	has_many :posts	

	def giphy_scrape(search)
		begin
			search = search ? search : self.giphy_search
			sanitize = search.tr(" ", "+");
			key = "dc6zaTOxFJmzC"
			url = "http://api.giphy.com/v1/gifs/search?q=" + sanitize + "&api_key=" + key
			resp = Net::HTTP.get_response(URI.parse(url))
			buffer = resp.body
			result = JSON.parse(buffer)
			puts "results: ", result['data']
			temp = []
			result['data'].each do |x|
				puts x
				temp.push(x["images"]["fixed_height"]["url"])
			end	
			temp.each do |post|
				self.build_post("giphy", post, post, post, post)
			end
			return temp 
		rescue
			return nil
		end
	end


	def reddit_pic_scrape(sub)
		subredd = sub ? sub : self.subreddit
		reddit_api_url = "https://www.reddit.com/r/"+ subredd +".json"
		resp = Net::HTTP.get_response(URI.parse(reddit_api_url))
		data = resp.body
		result = JSON.parse(data)
		result["data"]["children"].each do |post|
			begin
				self.build_post("reddit", post["data"]["preview"]["images"].first["source"]["url"], post["data"]["title"], post["data"]["preview"]["images"].first["source"]["url"], post["data"]["preview"]["images"].first["source"])
			rescue
				puts "nope"
			end
		end
	end	

	def twitter_pic_scrape(search)
		t = self.get_twit_client
		search_var = search
		t.search(search_var, result_type: "recent").collect do |tweet|
			unless tweet.media[0].nil?
				puts "tweetlovin: "
				puts tweet
				img = tweet.media[0].media_url
				self.build_post("Twitter", img, tweet.text, img, img)
			end
		end	 		
	end

	def tumblr_pic_scrape(search)
		# self.get_tumblr_client
		client = Tumblr::Client.new
		img = client.posts(search + ".tumblr.com", :type => "photo", :limit => 50)["posts"]
		img.each do |post|
			author = post["post_author"]
			message = post["summary"]
			extracted_img = post['photos'][0]['alt_sizes'][0]['url']
			self.build_post("Tumblr", extracted_img, message, extracted_img, author)
		end
	end


	#  Posting Methods

	def post_tweet(post)
		twitCli = self.get_twit_client
		post = Post.find(post)
		begin
			img = open(post.og_source)
			if img.is_a?(StringIO)
			  ext = File.extname(url)
			  name = File.basename(url, ext)
			  Tempfile.new([name, ext])
			else
			  img
			end		
			post.twit_published += 1
			puts post.twit_published
			post.save
			twitCli.update_with_media(post.body.to_s, img)
		rescue
			puts "nothin here"
		end
	end

	def post_tumblr(post)
		post = Post.find(post)
		tumblr_client = self.get_tumblr_client
		client = Tumblr::Client.new
		begin
			url = post.og_source
			img = URI.parse(post.image_src)
			client.photo("ourcatsareassholes.tumblr.com", source: img)
			puts "posted!"
		rescue => e
			puts e
		end
	end
	

	def post_fb
		puts "starting FB post..."
		user_access_token = self.fb_token
		@user_graph = Koala::Facebook::API.new(user_access_token)
	    app_id = self.fb_app_id
	    app_secret = self.fb_app_secret
	    callback_url = "http://localhost:3000/dashes/#{self.id}/fb_oauth"

		@oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
		pages = @user_graph.get_connections('me', 'accounts')

		access_token = pages.first['access_token']
		page_id = pages.first['id']
		@page_graph = Koala::Facebook::API.new(access_token)
		post = self.posts.shuffle.first
		puts "almost there!"
		post @page_graph

		img = open(post.image_src)
		if img.is_a?(StringIO)
		  ext = File.extname(url)
		  name = File.basename(url, ext)
		  img = Koala::UploadableIO.new(img)
		end					
		message =  post.body.to_s
		url = "http://localhost:3000/dashes/#{self.id}/home"
		@page_graph.put_picture(img, content_type = 'image/jpeg', message)
		post.fb_published = true
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


	def get_tumblr_client
		tumblr = Tumblr.configure do |config|
			  config.consumer_key = self.tumblr_consumer_key
			  config.consumer_secret = self.tumblr_consumer_secret
			  config.oauth_token = self.tumblr_oauth_token
			  config.oauth_token_secret = self.tumblr_oauth_token_secret
			end
		return tumblr
	end


	def fb_oauth
	    app_id = self.fb_app_id
	    app_secret = self.fb_app_secret
	    callback_url = "http://localhost:3000/dashes/#{self.id}/"
	    @oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
	    oauth_url = @oauth.url_for_oauth_code
	    return oauth_url 		
	end

	def fb_set_token(code)
		app_id = self.fb_app_id
		app_secret = self.fb_app_secret
		callback_url = "http://localhost:3000/dashes/#{self.id}/fb_oauth"
		@oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
		access_token = @oauth.get_access_token(code)
		self.fb_oauth_access_token = access_token
		self.save
	end



	#Build Methods
	def build_from_array(array)

	end

	def build_post(title, src, body, image, author)
		p = self.posts.build(title: title, og_source: src, body: body, image_src: image, author: author)		
		p.save
	end




	# JSON Formatting
	# def as_json(options={})
	#   super(:only => [:name],
	#         :include => {
	#           :posts => {:only => [:title, :body, :image_src]
	#           }
	#         }
	#   )
	# end	
end


