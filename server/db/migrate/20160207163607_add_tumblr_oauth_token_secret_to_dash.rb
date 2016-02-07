class AddTumblrOauthTokenSecretToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_oauth_token_secret, :string
  end
end
