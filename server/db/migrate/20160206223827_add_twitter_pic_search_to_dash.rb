class AddTwitterPicSearchToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :twitter_pic_search, :string
  end
end
