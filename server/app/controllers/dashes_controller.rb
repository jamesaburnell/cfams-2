class DashesController < ApplicationController
  before_action :add_posts, only: [:add_reddit_pics, :add_tumblr_pics, :add_twitter_pics, :add_giphy_gifs]
  before_action :set_post, only: [:edit_post]
  before_action :set_dash, only: [:show, :edit, :update, :destroy]
  before_action :set_dash_by_dash_id, only: [:post_queue, :fb_oauth, :text_post, :email_post, :post_tumblr, :post_tweet, :edit_post, :add_automation_time, :robot, :add_term, :destroy_term, :favorite_tweets, :scrape, :add_reddit_pics, :add_twitter_pics, :add_tumblr_pics, :add_giphy_gifs]
  before_action :authenticate_user!, only: [:index, :show, :scrape, :new, :email_post, :text_post]

  def index
    @dashes = Dash.all.where(user_id: current_user)
    @dash = @dashes.first
    @posts = Post.all.where(approved: nil)
  end

  def show
    @user = current_user
    @posts = @dash.posts.where(approved: nil)
    respond_to do |format|
      format.html 
      format.json { render json: @posts }
    end        
  end

  def new
    @dash = Dash.new
  end

  def edit
  end

  def create
    @dash = Dash.new(dash_params)
    respond_to do |format|
      if @dash.save
        format.html { redirect_to @dash, notice: 'Dash was successfully created.' }
        format.json { render :show, status: :created, location: @dash }
      else
        format.html { render :new }
        format.json { render json: @dash.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dash.update(dash_params)
        format.html { redirect_to @dash, notice: 'Dash was successfully updated.' }
        format.json { render :show, status: :ok, location: @dash }
      else
        format.html { render :edit }
        format.json { render json: @dash.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @dash.destroy
    respond_to do |format|
      format.html { redirect_to dashes_url, notice: 'Dash was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

# Custom Actions - - - - - - - - >
# Robot
  def robot
    respond_to do |format|
      format.html 
      format.json { render json: @dash.terms }
    end       
  end

  def add_term
    body = params[:body]
    count = params[:count]
    term = Term.new(dash_id: @dash.id, count: count, body: body)
    term.save
    @dash.save
    redirect_to(dash_robot_path(@dash))
  end

  def add_automation_time
    time = params[:start_time]
    task = params[:task]
    time = Time.parse(time)
    puts "time: ", time
    at = AutomationTime.new(start_time: time, task: task)
    @dash.automation_times << at
    redirect_to(dash_robot_path(@dash))
  end

  def destroy_term
    term = Term.find(params[:term_id])
    term.destroy
    redirect_to(dash_robot_path(@dash))
  end

  def favorite_tweets
    res = @dash.tweet_loop
    respond_to do |format|
      if res != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'Tweets favorited!' }
      elsif res == "too many requests"
        puts "errors!"
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      end
    end
  end




# Scraper
  def scrape
    @user = current_user
    @posts = @dash.posts.where(approved: nil)
    respond_to do |format|
      format.html 
      format.json { render json: @posts }
    end        
  end

  def post_queue
    @posts = Post.where(approved: true, dash_id: @dash.id).shuffle.take(20)
    respond_to do |format|
      format.html 
      format.json { render json: @posts }
     end        
  end

  def add_reddit_pics
    search_term = params[:search_term]
    @dash.subreddit = search_term
    @dash.save
    @dash.reddit_pic_scrape(search_term)
    redirect_to dash_scrape_path(@dash)
  end

  def add_twitter_pics
    search_term = params[:search_term]
    @dash.twitter_pic_search = search_term
    @dash.save
    @dash.twitter_pic_scrape(search_term)
    redirect_to dash_scrape_path(@dash)
  end

  def add_giphy_gifs
    search_term = params[:search_term]
    @dash.giphy_search = search_term
    @dash.save
    @dash.giphy_scrape(search_term)
    redirect_to dash_scrape_path(@dash)
  end

  def add_tumblr_pics
    search_term = params[:search_term]
    @dash.tumblr_pic_search = search_term
    @dash.save
    @dash.tumblr_pic_scrape(search_term)
    redirect_to dash_scrape_path(@dash)
  end



# Post Queue
  def edit_post
    begin
      body = params[:body_text]
      @post.body = body
      @post.save
      res = "success! changed to #{@post.body}"
    rescue
      res = 'tried'
    end
      respond_to do |format|
      if res != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: res }
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      end
    end
  end

  def post_tweet
    if params[:post_id]
      post_id = params[:post_id]
      res = @dash.post_tweet(post_id)
    else
      post = Post.all.where(dash_id: @dash.id, approved: true, twit_published: 0).shuffle.first      
      res = @dash.post_tweet(post.id)      
    end
    respond_to do |format|
      if res != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'Tweet Posted.' }
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      end
    end
  end

  def post_tumblr
    if params[:post_id]
      post_id = params[:post_id]
      res = @dash.post_tumblr(post_id)
    else
      post = Post.all.where(dash_id: @dash.id, approved: true, tumblr_published: 0).shuffle.first      
      res = @dash.post_tumblr(post.id)      
    end
    respond_to do |format|
      if res != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'Tumblr Posted.' }
      
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      
      end
    end
  end

  def email_post
      @user = current_user
      @post = Post.find(params[:post_id])
      res = EmailPost.send_post_email(@user, @post).deliver
    respond_to do |format|
      if res != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'Email Sent.' }
      
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      end
    end
  end

  def text_post
    @user = User.find(current_user.id)
    @post = Post.find(params[:post_id])
    @twilio = @dash.get_twilio_client
    puts @user.mobile_number
    user_mobile = '+1' + @user.mobile_number
    @twilio.messages.create(
      from: '+12622879807',
      to: user_mobile,
      body: @post.image_src
    )      
    respond_to do |format|
      if @twilio != 'tried'
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'Text Sent.' }
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      end
    end
  end


# Auth Actions
  def fb_oauth
    code = params[:code]
    @dash.fb_set_token(code)
    redirect_to @dash
  end

  private
    def add_posts
      search_term = params[:search_term]
    end
    def set_post
      @post = Post.find(params[:post_id])
    end
    def set_dash
      @dash = Dash.find(params[:id])
    end
    def set_dash_by_dash_id
      @dash = Dash.find(params[:dash_id])
    end
    def dash_params
      params.require(:dash).permit(:user_id, :title, :subreddit, :fb_token, :fb_app_id, :fb_app_secret, :fb_oauth_access_token, :twit_consumer_key, :twit_consumer_key, :twit_consumer_secret, :twit_access_token, :twit_access_token_secret, :giphy_search, :twitter_pic_search, :tumblr_pic_search, :tumblr_consumer_key, :tumblr_consumer_secret, :tumblr_oauth_token, :tumblr_oauth_token_secret, :author)
    end
end
