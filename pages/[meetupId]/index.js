import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import {Fragment} from 'react';
import Head from 'next/head';
function MeetupDetail(props) {
  return (

    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name = 'description'
          content = {props.meetupData.description}
        />
      </Head>
      <MeetupDetails
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>    
    
  );
}

export default MeetupDetail;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://dhruv9596:dhruv9596@cluster0.yyqkxyn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    //--------------IMPORTANT--------------------//
    //if fallback is set to false means you supported all params
    //if m3 is is not in path but user enteres it he eill get 404 error

    //if fallback is true getStaticPaths will generate dynamic page on server for incoming requests
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://dhruv9596:dhruv9596@cluster0.yyqkxyn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id : selectedMeetups._id.toString(),
        title : selectedMeetups.title,
        address : selectedMeetups.address,
        image : selectedMeetups.image,
        description : selectedMeetups.description,
      },
    },
  };
}
