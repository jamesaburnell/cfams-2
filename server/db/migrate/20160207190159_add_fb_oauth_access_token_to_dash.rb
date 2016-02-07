class AddFbOauthAccessTokenToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :fb_oauth_access_token, :string
  end
end
