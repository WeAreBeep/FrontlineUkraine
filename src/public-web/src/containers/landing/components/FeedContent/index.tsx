import React from 'react';
import { ContentfulText } from '../../../../components/ContentfulText';
import { useStyles } from './style';
import { OurVoicesTimeline } from '../OurVoicesTimeline';

export const FeedContent: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <ContentfulText
        html={`<h2>
    <strong>POWERING REAL-TIME ACTION</strong>
  </h2>
  <p>
    Frontline.live is a platform that empowers people on the frontline to
    report when supplies or equipment run short during times of
    crisis.&nbsp;
  </p>
  <p>
    We plot those needs on our digital map so that makers, citizens and
    community groups can see emerging problems and find ways of getting
    supplies to them quickly.
  </p>
  <p>
    Any not-for-profit organisation can use this open-source, rapid
    response platform when shortages appear during any crisis. 
    <a href="/contact-us" title="">
      Contact us
    </a> 
    if you want to know more.
  </p>
  <h2 id="ithasworked">
    IT HAS WORKED<strong>&nbsp;</strong> 
  </h2>
  <p></p>
  <p>
    This “risk radar” technology was built by volunteers during the PPE
    crisis that emerged during the Covid19 pandemic. Hundreds of frontline
    healthcare workers reported PPE shortages. Our platform empowered a
    growing network of activists and aligned 
    <a href="/partners" title="">
      partners
    </a>
    &nbsp;&nbsp;to respond rapidly to PPE shortages, to supply the vital
    PPE to keep them safe while the government and the NHS were
    struggling. [link to what we’ve done section]
  </p>
  <p>
    The impact so far is impressive: including over £500,000 of donated
    time/ services and over 500,000 units of PPE delivered.&nbsp;
  </p>
  <p>
    <iframe
      class="bordered"
      src="https://player.vimeo.com/video/427037095?title=0&amp;byline=0&amp;portrait=0"
      width="540"
      height="310"
      frameBorder="0"
      allow="autoplay;"
    ></iframe>
  </p>
  <p></p>
  <h2 id="howitworks"> HOW IT HAS WORKED </h2>
  <p></p>
  <p>
    This first version of the platform empowers community activists to
    support healthcare workers.
  </p>
  <p>
    <iframe
      class="bordered"
      src="https://player.vimeo.com/video/432241181?title=0&amp;byline=0&amp;portrait=0"
      width="540"
      height="310"
      frameBorder="0"
      allow="autoplay"
    ></iframe>
  </p>
  <p></p>
  <div class="indent contentfulStyledList">
    <p></p>
    <p>
      <span class="bignumber">1 </span> 
      <a href="/request-ppe" title="">
        Report when you are short
      </a>
    </p>
    <p>
      <span class="bignumber">2 </span> Have supplies? 
      <a href="/register-supplies" title="">
        Register to appear on the map
      </a>
    </p>
    <p>
      <span class="bignumber">3 </span>
      <strong> </strong>Our 
      <a
        href="https://www.goodsted.com/group/frontline-live/ckiouyg73d3m40106gtphrpkb"
        target="_blank"
        title=""
      >
        volunteers
      </a> 
      get you connected 
    </p>
    <p></p>
  </div>
  <p></p>
  <p></p>
  <h2>Read &amp; Hear</h2>
  <ul>
    <li>
      <p>
        <a
          href="https://www.thersa.org/comment/2020/12/bottom-up-support-for-the-frontline"
          target="_blank"
          title=""
        >
          Bottom up support for the frontline
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          href="https://www.thesun.co.uk/uncategorized/13755147/app-allows-nhs-staff-to-request-free-ppe-and-have-it-delivered-within-48-hours-amid-ongoing-covid-pandemic/"
          target="_blank"
          title=""
        >
          App allows NHS staff to request free PPE – and have it delivered
          within 48 hours amid ongoing Covid pandemic
        </a>
        <a
          href="https://www.buzzsprout.com/495862/4849772"
          target="_blank"
          title=""
        ></a>
      </p>
    </li>
    <li>
      <p>
        <a
          href="https://samtalks.technology/podcasts/katz-kiely-frontline"
          target="_blank"
          title=""
        >
          Talks about how frontline helps the NHS with PPE and why they
          have open sourced the platform.
        </a>
      </p>
    </li>
  </ul>
  <p></p>`}
      />
      <OurVoicesTimeline className={classes.ourVoiceTimeline} />
    </div>
  );
};
