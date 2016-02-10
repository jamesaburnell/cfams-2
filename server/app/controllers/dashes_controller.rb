class DashesController < ApplicationController
  before_action :set_dash, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:index, :show, :scrape, :new]

  # GET /dashes
  # GET /dashes.json
  def index
    @dashes = Dash.all.where(user_id: current_user)
    @dash = @dashes.first
    @posts = Post.all.where(approved: nil)
  end

  # GET /dashes/1
  # GET /dashes/1.json
  def show
    @user = current_user
    # @dash.reddit_pic_scrape()
    
    @posts = @dash.posts.where(approved: nil)
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @posts }
    end        
  end

  # GET /dashes/new
  def new
    @dash = Dash.new
  end

  # GET /dashes/1/edit
  def edit
  end

  # POST /dashes
  # POST /dashes.json
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

  # PATCH/PUT /dashes/1
  # PATCH/PUT /dashes/1.json
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

  # DELETE /dashes/1
  # DELETE /dashes/1.json
  def destroy
    @dash.destroy
    respond_to do |format|
      format.html { redirect_to dashes_url, notice: 'Dash was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  def robot
    @dash = Dash.find(params[:dash_id])

  end


  def favorite_tweets
    @dash = Dash.find(params[:dash_id])
    @dash.tweet_loop
    redirect_to(@dash)
  end

  def scrape
    @user = current_user
    @dash = Dash.find(params[:dash_id])
    # @dash.reddit_pic_scrape()
    
    @posts = @dash.posts.where(approved: nil)
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @posts }
    end        
  end

  def post_queue
    @dash = Dash.find(params[:dash_id])
    @posts = Post.where(approved: true, dash_id: @dash.id)
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @posts }
     end        
  end


# Custom Scrape Methods

  def add_reddit_pics
    search_term = params[:search_term]
    puts "SearchTerm: ", search_term
    @dash = Dash.find(params[:dash_id])
    @dash.subreddit = search_term
    @dash.save
    @dash.reddit_pic_scrape(search_term)
    redirect_to @dash
  end

  def add_twitter_pics
    search_term = params[:search_term]
    puts "SearchTerm: ", search_term
    @dash = Dash.find(params[:dash_id])
    @dash.twitter_pic_search = search_term
    @dash.save
    @dash.twitter_pic_scrape(search_term)
    redirect_to @dash
  end

  def add_giphy_gifs
    search_term = params[:search_term]
    puts "SearchTerm: ", search_term
    @dash = Dash.find(params[:dash_id])
    @dash.giphy_search = search_term
    @dash.save
    @dash.giphy_scrape(search_term)
    redirect_to @dash
  end

  def add_tumblr_pics
    search_term = params[:search_term]
    puts "SearchTerm: ", search_term
    @dash = Dash.find(params[:dash_id])
    @dash.tumblr_pic_search = search_term
    @dash.save
    @dash.tumblr_pic_scrape(search_term)
    redirect_to @dash
  end


  # Posting Actions
  def post_tweet
    @dash = Dash.find(params[:dash_id])
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
        format.html { redirect_to dash_post_queue_path(@dash), notice: 'There was an issue..' }
      end
    end
  end

  def post_tumblr
    @dash = Dash.find(params[:dash_id])
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
      # format.js
      else
        format.html { redirect_to dash_post_queue_path(@dash), status: 500, notice: 'There was an issue..' }
      # format.js
      end
    end
  end


  # Authorization Controller Methods

  def fb_oauth
    @dash = Dash.find(params[:dash_id])
    code = params[:code]
    @dash.fb_set_token(code)
    # @dash.save
    redirect_to @dash
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dash
      @dash = Dash.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dash_params
      params.require(:dash).permit(:user_id, :title, :subreddit, :fb_token, :fb_app_id, :fb_app_secret, :fb_oauth_access_token, :twit_consumer_key, :twit_consumer_key, :twit_consumer_secret, :twit_access_token, :twit_access_token_secret, :giphy_search, :twitter_pic_search, :tumblr_pic_search, :tumblr_consumer_key, :tumblr_consumer_secret, :tumblr_oauth_token, :tumblr_oauth_token_secret, :author)
    end
end
