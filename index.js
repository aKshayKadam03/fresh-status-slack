const { App } = require('@slack/bolt')
require('dotenv').config()

//payload
const modal = require('./payloads/creation.json')
const getAffectedComponents = require('./utils/getAffectedComponents')
 
//utils
const apiHelper = require('./utils/apiHelper')

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
})

app.command('/fire', async({ body , ack, respond, client })=>{
    await ack();
    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
          trigger_id: body.trigger_id,
          view: {
            type: 'modal',
            // View identifier
            callback_id: 'create_incident',
            ...modal
          }
        });
      }
      catch (error) {
        console.error(error);
      }
    
})


// Handle a view_submission request
app.view('create_incident', async ({ ack, body, view, client }) => {
  // Acknowledge the view_submission request
  await ack();
  const data = view.state.values
  
  const is_private = data['isPrivate']['choose-state']['selected_option']['value']
  const title = data['title']['plain_text_input-action']['value']
  const description = data['description']['plain_text_input-action']['value']
  const start_date = data['start_date']['datepicker-action']['selected_date']
  const start_time = data['start_time']['plain_text_input-action']['value']
  const end_date = data['end_date']['datepicker-action']['selected_date']
  const end_time = data['end_time']['plain_text_input-action']['value']
  const source = data['source']['static_select-action']['selected_option']['value']
  const send_notification = data['send_notification']['choose-state']['selected_option']['value']
  const twitter = data['twitter']['choose-state']['selected_option']['value']
  const affected_components = getAffectedComponents(data)

  const isoDate = new Date(start_date).toISOString()

  createIncidentModel = {
    "title": title,
    "description": description,
    "start_time": isoDate,
    // "end_time": end_date,
    "is_private": is_private,
    "affected_components": affected_components,
    "source": source,
    "notification_options": {
        "send_notification": send_notification,
        "send_tweet": twitter
    }
  }
  console.log(JSON.stringify(createIncidentModel))
  apiHelper(
            'post',
            'https://public-api.freshstatus.io/api/v1/incidents/',
            createIncidentModel
            )      
});

// Handle section state change
app.action('choose-state', async ({ ack }) => {
  await ack();
});
 
app.start(process.env.PORT || 3000).then(()=>{
    console.log('Bolt is running')
})