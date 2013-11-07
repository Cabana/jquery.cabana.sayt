# this is just server that searches google and returns the first 10 results as json
# used for testing
# install dependencies with `bundle install`
# and start the server with `cd examples && ruby server.rb`
# then point your browser to http://localhost:4567/basic.html
# or one of the other example html files

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
