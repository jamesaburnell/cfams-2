Rails.application.routes.draw do
  # resources :posts
  mount_devise_token_auth_for 'User', at: 'auth'
  # devise_for :users
  # resources :dashes

  resources :dashes do
	  get "/post_queue"  => 'dashes#post_queue', path: 'queue'
    get "/add_twitter_pics" => "dashes#add_twitter_pics"
	  get "/add_giphy_gifs" => "dashes#add_giphy_gifs"
    resources :posts do  
      get 'toggle_approve', :on => :member   
  	  get 'toggle_disapprove', :on => :member   
  	end  
  end
  root "dashes#index"
end
