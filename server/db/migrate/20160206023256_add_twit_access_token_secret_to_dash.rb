class AddTwitAccessTokenSecretToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :twit_access_token_secret, :string
  end
end
