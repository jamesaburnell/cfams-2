class AddTwitAccessTokenToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :twit_access_token, :string
  end
end
