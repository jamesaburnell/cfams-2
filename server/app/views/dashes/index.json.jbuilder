json.array!(@dashes) do |dash|
  json.extract! dash, :id, :title
  json.url dash_url(dash, format: :json)
end
