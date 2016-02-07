class AddTumblrOauthTokenToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_oauth_token, :string
  end
end
