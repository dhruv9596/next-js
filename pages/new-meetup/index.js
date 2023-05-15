import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import {Fragment} from 'react';
import Head from 'next/head';
function NewMeetupPage() {
    const route = useRouter();
    async function addMeetupHandler(enteredData) {

        const response = await fetch('/api/new-meetup' , {
          method : 'POST',
          body : JSON.stringify(enteredData),
          headers : {
            'Content-Type' : 'application/json'
          }
        });

        const data = await response.json();
        console.log(data);
        route.push('/');

    }
  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta name = 'description'
          content = 'Add new meetups'
        />
      </Head>
      <NewMeetupForm onAddMeetup = {addMeetupHandler}/>
    </Fragment>
  )
}

export default NewMeetupPage