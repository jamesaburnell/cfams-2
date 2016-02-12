Rails.application.routes.draw do
  # Added by Koudoku.
  mount Koudoku::Engine, at: 'k'
  scope module: 'koudoku' do
    get 'pricing' => 'subscriptions#index', as: 'pricing'
  end


  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth'
  end
  devise_for :users
  # Dash Routes
  resources :dashes do
    resources :terms
    get '/add_term', to: "dashes#add_term"
    delete '/destroy_term', to: "dashes#destroy_term"
    # Auth Routes
    get "/fb_oauth"  => 'dashes#fb_oauth'   

    # Controller Action Routes
    get "/scrape"  => 'dashes#scrape', path: 'scrape'
    get "/post_queue"  => 'dashes#post_queue', path: 'queue'
	  get "/edit_post"  => 'dashes#edit_post', path: 'edit-post'
    get "/add_twitter_pics" => "dashes#add_twitter_pics", path: 'twitter-pics'
    get "/add_giphy_gifs" => "dashes#add_giphy_gifs", path: 'giphy-gifs'
    get "/add_reddit_pics" => "dashes#add_reddit_pics", path: 'reddit-pics'
	  get "/add_tumblr_pics" => "dashes#add_tumblr_pics", path: 'tumblr-pics'


    # Posting to Channels
    get "/post_tweet" => "dashes#post_tweet"
    get "/post_tumblr" => "dashes#post_tumblr"
    get "/email_post" => "dashes#email_post"
    get "/text_post" => "dashes#text_post"


    get "/robot" => "dashes#robot", path: 'phil'
    get "/favorite_tweets" => "dashes#favorite_tweets", path: 'favorite-tweets'

    # Post Routes
    resources :posts do
      get 'toggle_approve', :on => :member   
  	  get 'toggle_disapprove', :on => :member   
  	end
  end

  root "dashes#index"
end
