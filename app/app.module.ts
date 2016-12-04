import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { GenericExpressionNodeComponent } from './view/expressionnodes/genericexpressionnode/genericexpressionnode.component';
import { ExpressionTreeComponent } from './view/expressiontree/expressiontree.component';
import { FlasherComponent } from './view/flasher/flasher.component';
import { CompoundExpressionComponent } from './view/expressionnodes/compoundexpressionnode/compoundexpressionnode.component';
import { ConnectorComponent } from './view/connector/connector.component';
import { LogPlaybackControlsComponent }  from './view/logplaybackcontrols/mediabuttons/mediabuttons.component';
import { LogMessagesPlaybackComponent } from './view/logplaybackcontrols/logmessages/logmessages.component';
import { NumberExpressionNodeComponent } from './view/expressionnodes/numberexpressionnode/numberexpressionnode.component'
import { LogPlaybackSliderComponent } from './view/logplaybackcontrols/logplaybackslider/logplaybackslider.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ 
        AppComponent, 
        CompoundExpressionComponent,
        ConnectorComponent,
        ExpressionTreeComponent,
        FlasherComponent,
        GenericExpressionNodeComponent,
        LogPlaybackControlsComponent,
        LogMessagesPlaybackComponent,
        NumberExpressionNodeComponent,
        LogPlaybackSliderComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
