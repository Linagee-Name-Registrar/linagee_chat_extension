<div className="chats">
<div className="spacer"></div>
  {mdata.map(product => (

  <ListItem alignItems="flex-start" component="div" >

{product.roomId == "me" ? (
  <>
  
<ListItemText
sx={{ textAlign: 'right', float: 'right', marginTop:'2px', marginBottom:'2px', marginLeft: '50px', marginRight: '7px'}}
primary={product.roomId}
secondary={
  <React.Fragment>
    <Typography
      sx={{ display: 'inline' }}
      component="span"
      variant="subtitle2"
      color="text.secondary"
    >
      11:12 am
    </Typography>
  </React.Fragment>
}

/>

  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />

</>

) : (
<>        


<Avatar sx={{marginRight: '3px', padding: '3px'}} alt="Travis Howard" src="/static/images/avatar/2.jpg" />

<ListItemText
sx={{ marginTop:'2px', marginBottom:'2px',marginLeft: '7px', marginRight: '50px' }}
primary={product.roomId}
secondary={
<React.Fragment>
  <Typography
    sx={{ display: 'inline' }}
    component="span"
    variant="subtitle2"
    color="text.secondary"
  >
    11:12 am
  </Typography>
</React.Fragment>
}
/></>
)}


</ListItem>

))}
<div ref={bottomRef} />
</div>