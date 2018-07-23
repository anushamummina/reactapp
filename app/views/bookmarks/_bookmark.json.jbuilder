json.extract! bookmark, :id, :host, :url, :title, :category_id, :created_at, :updated_at
json.url bookmark_url(bookmark, format: :json)
