Rails.application.routes.draw do
  resources :posts
  mount_devise_token_auth_for 'User', at: 'auth'
  # devise_for :users
  resources :dashes

  resources :dashes do
	  get "/add_twitter_pics" => "dashes#add_twitter_pics"
  end
  root "dashes#index"
end
