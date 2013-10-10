# this is just server that serves some static json used for testing

require 'sinatra'
require 'json'

get '/' do
  send_file 'demo.html'
end

get '/jquery.sayt.js' do
  send_file 'jquery.sayt.js'
end

get '/demo.js' do
  send_file 'demo.js'
end

get '/ajax' do
  response = []

  (1..10).to_a.sample.times do
    response << { url: "http://google.com", text: "google" }
  end

  response.to_json
end
