# ################################################################

# Contributers:
# - [AI] Arslan Ismail
#

# Using latest LTS version running on alpine
# node:lts-slim <==> node:12-buster-slim
FROM node:16-slim


RUN mkdir /usr/src/app
WORKDIR /usr/src/app


# Copy all the app source
COPY . /usr/src/app
RUN npm install

# Compile Source code

# Expose port 3000 to the host
EXPOSE 5000

# RUN following command
CMD npm run start
