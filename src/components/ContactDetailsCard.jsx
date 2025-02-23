const ContactDetailsCard = ({ contact }) => {
    return (
      <div className='flex items-center gap-3'>
        <span><contact.icon className="rounded-full border-2 border-white/15 p-2 text-4xl bg-[#EB10E8] text-white"/></span>
        {contact.link ? (
        <a href={contact.link} className='text-gray-800 text-[15px] hover:underline'>{contact.value}</a>
        ) : (
        <span className='text-gray-700'>{contact.value}</span>
        )}
      </div>
    )
  }
  
  export default ContactDetailsCard
  