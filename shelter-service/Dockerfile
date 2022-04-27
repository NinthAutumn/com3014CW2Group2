FROM ruby:2.7.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir -p /usr/src/app/shelter
WORKDIR /usr/src/app/shelter
COPY Gemfile /usr/src/app/shelter/Gemfile
COPY Gemfile.lock /usr/src/app/shelter/Gemfile.lock

COPY . /usr/src/app/shelter/
RUN gem install bundler:2.2.15
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3006

# Configure the main process to run when running the image
CMD ["rails", "s", "-b", "0.0.0.0","-p","3006"]