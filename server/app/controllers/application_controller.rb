class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # disable this when api time 
  protect_from_forgery with: :exception

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
# enabled this ::: 
  # protect_from_forgery with: :null_session
  # include DeviseTokenAuth::Concerns::SetUserByToken
end
