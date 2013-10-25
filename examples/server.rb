# this is just server that serves some static json used for testing
# start it with `ruby server.rb`
# requires that Sinatra is installed, install it with `gem install sinatra`

require 'sinatra'
require 'google-search'
require 'json'

get '/*.html' do
  send_file params[:splat].first + '.html'
end

get '/cabana.sayt.js' do
  send_file '../cabana.sayt.js'
end

get '/ajax' do
  results = Google::Search::Web.new(query: params[:query]).all_items[1..10].map do |result|
    { url: result.uri, text: result.title }
  end.to_json
end

post '/ajax' do
  results = Google::Search::Web.new(query: params[:query]).all_items[1..10].map do |result|
    { url: result.uri, text: result.title }
  end.to_json
end
