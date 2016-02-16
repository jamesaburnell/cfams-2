class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include Devise::Controllers::Helpers
	protect_from_forgery with: :null_session
	before_action :skip_authenticate

  # disable this when api time 
 # protected
 #  def authenticate_user!
 #    if user_signed_in?
 #      super
 #    else
 #      redirect_to '/users/sign_in'
 #      ## if you want render 404 page
 #      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
 #    end
 #  end
	# protect_from_forgery with: :exception
	# skip_before_action :verify_authenticity_token, if: -> {params[:controller].split('/')[0] == 'api'}
# enabled this ::: 

  	def skip_authenticate
	    if params[:controller].split('/')[0] == 'devise_token_auth'
			include DeviseTokenAuth::Concerns::SetUserByToken
		else
			authenticate_user!
	    end
	end	  
end
