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
EXPOSE 3000

# Start the main process.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]