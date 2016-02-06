class AddSubredditToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :subreddit, :string
  end
end
