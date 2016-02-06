json.array!(@posts) do |post|
  json.extract! post, :id, :title, :og_source, :body, :image_src
  json.url post_url(post, format: :json)
end
