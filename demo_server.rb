# this is just server that serves some static json used for testing

require 'sinatra'
require 'json'


get '/ajax' do
  response = []

  (1..10).to_a.sample.times do
    response << { url: "http://google.com", text: "google" }
  end

  response.to_json
end
