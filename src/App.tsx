import React, { useState } from 'react';
import moment from 'moment';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    );
}

function DateTimePretty(WrappedComponent) {
    return function EnhancedComponent(props) {
        const now = moment();
        const date = moment(props.date);
        let formattedDate;

        const diffInMinutes = now.diff(date, 'minutes');
        const diffInHours = now.diff(date, 'hours');
        const diffInDays = now.diff(date, 'days');

        if (diffInMinutes < 60) {
            formattedDate = `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
            formattedDate = `${diffInHours} hours ago`;
        } else {
            formattedDate = `${diffInDays} days ago`;
        }

        return <WrappedComponent {...props} date={formattedDate} />;
    };
}

const EnhancedDateTime = DateTimePretty(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <EnhancedDateTime date={props.date} />
        </div>
    );
}

function VideoList(props) {
    return props.list.map((item, index) => <Video key={index} url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);
    return (
        <VideoList list={list} />
    );
}