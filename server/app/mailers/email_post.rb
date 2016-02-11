class EmailPost < ApplicationMailer
  default :from => 'hathbanger.ah@gmail.com'

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_post_email(user, post)
  	@post = post
    @user = user
    mail( :to => @user.email,
    :subject => 'Thanks for signing up for our amazing app',
    :message => @post.image_src )
  end	
end
