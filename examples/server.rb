# this is just server that serves some static json used for testing
# start it with `ruby server.rb`
# requires that Sinatra is installed, install it with `gem install sinatra`

require 'sinatra'
require 'json'

get '/*.html' do
  send_file params[:splat].first + '.html'
end

get '/cabana.sayt.js' do
  send_file '../cabana.sayt.js'
end

get '/ajax' do
  response = []
  10.times { response << { url: "http://google.com", text: "google" } }
  response.to_json
end

post '/ajax' do
  response = []
  10.times { response << { url: "http://google.com", text: "google" } }
  response.to_json
end
