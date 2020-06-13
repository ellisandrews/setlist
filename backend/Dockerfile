FROM ruby:2.6.1

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /setlist-backend
WORKDIR /setlist-backend
COPY Gemfile /setlist-backend/Gemfile
COPY Gemfile.lock /setlist-backend/Gemfile.lock
RUN gem install bundler && bundle update --bundler
RUN bundle install
COPY . /setlist-backend

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# NOTE: Heroku does not support the `EXPOSE` keyword, as a port is assigned at runtime.
#       Therefore, we must read in the $PORT environment variable which gets set by Heroku.
#       If running locally (e.g. in development env) $PORT mussed be passed as en environment variable.

# Start the main process.
CMD bundle exec rails server -b 0.0.0.0 -p $PORT
