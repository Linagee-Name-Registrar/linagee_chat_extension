
      <div className="spacer"></div>
      
      {(conversations.convos).map(product => (
        
    <div>
      prodf
      {product}
      <div onClick={goTo}>
      <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >
        <ListItemButton>

<ListItemAvatar>
<Avatar alt="Travis Howard"/>
</ListItemAvatar>
<ListItemText
primary={((product.userReference)[1]).primary}
//primary={product}
secondary={
<React.Fragment className="list-text">
    <Typography
    sx={{ display: 'inline' }}
    component="span"
    variant="body2"
    // color="text.primary"
    >
    {(((product.userReference)[1]).addr).slice(0, 21)+'...'}
    </Typography>
    
    {/* {(product.secondary).slice(0, 14)+'...'} */}
</React.Fragment>
}
/>
</ListItemButton>
</ListItem>
<Divider />
      </div>
    </div>
  ))}
  
  