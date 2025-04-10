const nodemailer = require('nodemailer');
const generateInventoryEmailHTML = (data) => {
    const {
      inventoryType,
      bloodGroup,
      quantity,
      email,
      organisationName,
      hospitalName,
      donarName,
      createdAt,
    } = data;
  
    const formattedDate = new Date(createdAt).toLocaleString();
    const isIn = inventoryType === "in";
  
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px;">
        <h2 style="color: #e74c3c; text-align: center;">🩸 Blood Inventory ${isIn ? "Donation" : "Issue"} Update</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Inventory Type:</td>
            <td style="padding: 10px;">${inventoryType.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Blood Group:</td>
            <td style="padding: 10px;">${bloodGroup}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Quantity:</td>
            <td style="padding: 10px;">${quantity} Units</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Donor Email:</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          ${isIn ? `
          <tr>
            <td style="padding: 10px; font-weight: bold;">Donated By:</td>
            <td style="padding: 10px;">${donarName}</td>
          </tr>` : `
          <tr>
            <td style="padding: 10px; font-weight: bold;">Issued To:</td>
            <td style="padding: 10px;">${hospitalName}</td>
          </tr>`}
          <tr>
            <td style="padding: 10px; font-weight: bold;">Organisation:</td>
            <td style="padding: 10px;">${organisationName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Date & Time:</td>
            <td style="padding: 10px;">${formattedDate}</td>
          </tr>
        </table>
  
        <p style="margin-top: 30px; text-align: center; color: #555;">
          Thank you for supporting our <strong>Blood Management System</strong>.
        </p>
        <p style="text-align: center; color: #999;">– Team BloodCare</p>
      </div>
    </div>
    `;
  };


  const generateRequestEmailHTML = (data) => {
    const {
      requesterName,
      requesterType,
      email,
      contactNumber,
      bloodGroup,
      units,
      reason,
      status,
      createdAt,
    } = data;
  
    const formattedDate = new Date(createdAt).toLocaleString();
  
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #c0392b;">🩸 New Blood Request Received</h2>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Requester Name:</td>
            <td style="padding: 10px;">${requesterName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Requester Type:</td>
            <td style="padding: 10px;">${requesterType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Contact Number:</td>
            <td style="padding: 10px;">${contactNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Blood Group:</td>
            <td style="padding: 10px;">${bloodGroup}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Units Requested:</td>
            <td style="padding: 10px;">${units}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Reason:</td>
            <td style="padding: 10px;">${reason}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Status:</td>
            <td style="padding: 10px;">${status}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Requested At:</td>
            <td style="padding: 10px;">${formattedDate}</td>
          </tr>
        </table>
  
        <p style="margin-top: 30px; text-align: center; color: #555;">
          Please respond to this request at your earliest convenience.
        </p>
        <p style="text-align: center; color: #999;">– Team BloodCare</p>
      </div>
    </div>
    `;
  };

  const generateCampaignEmailHTML = (data) => {
    const {
      campaignName,
      location,
      date,
      time,
      expectedDonors,
      collectedUnits,
      status,
      description,
      createdAt,
      organiserName,
    } = data;
  
    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = time;
    const formattedCreated = new Date(createdAt).toLocaleString();
  
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 30px;">
        <h2 style="color: #e74c3c; text-align: center;">📢 Blood Donation Campaign ${status === 'Upcoming' ? 'Announcement' : 'Update'}</h2>
        
        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Campaign Name:</td>
            <td style="padding: 8px;">${campaignName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Organised By:</td>
            <td style="padding: 8px;">${organiserName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Location:</td>
            <td style="padding: 8px;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Date:</td>
            <td style="padding: 8px;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Time:</td>
            <td style="padding: 8px;">${formattedTime}</td>
          </tr>
          ${
            expectedDonors
              ? `<tr><td style="padding: 8px; font-weight: bold;">Expected Donors:</td><td style="padding: 8px;">${expectedDonors}</td></tr>`
              : ""
          }
          ${
            collectedUnits
              ? `<tr><td style="padding: 8px; font-weight: bold;">Collected Units:</td><td style="padding: 8px;">${collectedUnits}</td></tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px; font-weight: bold;">Status:</td>
            <td style="padding: 8px;">${status}</td>
          </tr>
          ${
            description
              ? `<tr><td style="padding: 8px; font-weight: bold;">Description:</td><td style="padding: 8px;">${description}</td></tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px; font-weight: bold;">Created At:</td>
            <td style="padding: 8px;">${formattedCreated}</td>
          </tr>
        </table>
  
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #555;">Join us and help save lives by donating blood. Every drop counts! ❤️</p>
          <p style="color: #999;">– Team BloodCare</p>
        </div>
      </div>
    </div>
    `;
  };
  
  
  

  
const sendBloodInventorytEmail = async (recipientEmail,inventory) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })
// title, description, location, latitude, longitude, newStatus, updaterRole, fromEmail
        const emailcontent =generateInventoryEmailHTML(inventory);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New Inveontory added',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}


  
const sendRequesttEmail = async (recipientEmail,Request) => {

    console.log("sendRequesttEmail$$$$$$$$$$$$$$$$$$$",recipientEmail);
    
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })
// title, description, location, latitude, longitude, newStatus, updaterRole, fromEmail
        const emailcontent =generateRequestEmailHTML(Request);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New Blood request',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}

  
const sendCampigntEmail = async (recipientEmail,campaign) => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })
// title, description, location, latitude, longitude, newStatus, updaterRole, fromEmail
        const emailcontent =generateCampaignEmailHTML(campaign);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New campaign  ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}





module.exports={
    sendBloodInventorytEmail,
    sendRequesttEmail,
    sendCampigntEmail
}
