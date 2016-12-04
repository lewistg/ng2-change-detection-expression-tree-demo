import { 
    AfterViewChecked,
    OnChanges,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren 
} from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from '../expressionnode.component';
import { FlashLog } from '../../../model/flashlog';
import { FlashLogPlayback } from '../../../model/flashlogplayback';
import { CompoundExpression, Expression, NumberExpression, Operator } from '../../../model/expression';
import { FlasherComponent } from '../../flasher/flasher.component';
import { ExpressionChanged, NgOnChangesCalled, NgAfterViewChecked } from '../../flashlogentries';

@Component({
    moduleId: module.id,
    selector: 'compound-expression-node',
    templateUrl: 'compoundexpressionnode.component.html',
    styleUrls: ['compoundexpressionnode.component.css'],
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: CompoundExpressionComponent}]
})
export class CompoundExpressionComponent implements AfterViewChecked, ExpressionNodeComponent, OnChanges {
    operators = Operator;

    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);

    private _expression: CompoundExpression = new CompoundExpression(new NumberExpression(0), Operator.ADD, new NumberExpression(0)); 
    @Input() set expression(value: CompoundExpression) {
        if (this._expression === value) {
            return;
        }
        
        if (!!this.flasher) {
            this._log.log(new ExpressionChanged(this.flasher, this._expression, value), !this._logPlayback.isPlayingBack);
        }

        this._expression = value;
        this.expressionChange.emit(this._expression);
    }
    get expression(): CompoundExpression {
        return this._expression;
    }

    get operator(): string {
        return this._expression.operator.toString();
    }
    set operator(value: string) {
        this.expression = this.expression.setOperator(parseInt(value, 10));
    }

    get leftExpression(): Expression {
        return this._expression.left;
    }
    set leftExpression(expression: Expression) {
        this.expression = this.expression.setLeftExpression(expression);
    }

    get rightExpression(): Expression {
        return this._expression.right;
    }
    set rightExpression(expression: Expression) {
        this.expression = this.expression.setRightExpression(expression);
    }

    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeElementRef', {read: ElementRef}) nodeElementRef: ElementRef;
    @ViewChild(FlasherComponent) flasher: FlasherComponent;
    @ViewChildren('leftExpressionNode, rightExpressionNode', {read: EXPRESSION_NODE_COMPONENT}) childExpressions: QueryList<ExpressionNodeComponent>;

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.childExpressions) {
            return this.childExpressions.toArray();
        } else {
            return [];
        }
    }

    constructor(private _log: FlashLog, private _logPlayback: FlashLogPlayback) { }

    ngAfterViewChecked() {
        if (!!this.flasher) {
            this._log.log(new NgAfterViewChecked(this.flasher), !this._logPlayback.isPlayingBack);
        }
    }

    ngOnChanges() {
        if (!!this.flasher) {
            this._log.log(new NgOnChangesCalled(this.flasher), !this._logPlayback.isPlayingBack);
        }
    }
}
