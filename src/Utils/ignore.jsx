{conversations && conversations.length > 0 &&(
    <div className="test">
    
        <div className="spacer"></div>
        
          {conversations.map(product => (
        <div>
          
          <div onClick={goTo}>
          <ListItem sx={{height:'fit-content'}} alignItems="flex-start" component="div" >
            <ListItemButton>

<ListItemAvatar>
    <Avatar alt="Travis Howard"/>
</ListItemAvatar>
<ListItemText
    primary={product.roomId}
    secondary={
    <React.Fragment className="list-text">
        <Typography
        sx={{ display: 'inline' }}
        component="span"
        variant="body2"
        // color="text.primary"
        >
        to Scott, Alex, Jennifer
        </Typography>
        {product.roomName}
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
      
      </div>
      )}