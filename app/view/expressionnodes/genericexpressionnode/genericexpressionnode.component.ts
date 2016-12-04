import { 
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OpaqueToken,
    Output,
    TemplateRef,
    ViewChild 
} from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from '../expressionnode.component';
import { CompoundExpressionComponent } from '../compoundexpressionnode/compoundexpressionnode.component';
import { CompoundExpression, NumberExpression, Expression } from '../../../model/expression';

@Component({
    moduleId: module.id,
    selector: 'expression-node',
    templateUrl: 'genericexpressionnode.component.html',
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: GenericExpressionNodeComponent}]
})
export class GenericExpressionNodeComponent implements ExpressionNodeComponent {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);

    private _expression: Expression;
    @Input() get expression(): Expression {
        return this._expression;
    }
    set expression(value: Expression) {
        if (this._expression === value) {
            return;
        }
        this._expression = value;
        this.expressionChange.emit(this._expression);
    }

    @ViewChild('node', {read: EXPRESSION_NODE_COMPONENT}) node: ExpressionNodeComponent;

    get nodeDivTemplate(): TemplateRef<void> {
        if (!!this.node) {
            return this.node.nodeDivTemplate;
        }
    }

    get nodeElementRef(): ElementRef {
        if (!!this.node) {
            return this.node.nodeElementRef;
        }
    }

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.node) {
            return this.node.childNodes || [];
        } else {
            return [];
        }
    }

    get isCompoundExpression(): boolean {
        return this.expression instanceof CompoundExpression;
    }

    get isNumberExpression(): boolean {
        return this.expression instanceof NumberExpression;
    }

    constructor(public elementRef: ElementRef) {}
}
