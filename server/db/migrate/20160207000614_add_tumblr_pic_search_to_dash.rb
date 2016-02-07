class AddTumblrPicSearchToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_pic_search, :string
  end
end
