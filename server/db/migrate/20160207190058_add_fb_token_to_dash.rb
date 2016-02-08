class AddFbTokenToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :fb_token, :string
  end
end
