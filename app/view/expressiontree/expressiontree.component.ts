import { 
    AfterViewInit,
    AfterViewChecked,
    Component,
    ElementRef,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    QueryList 
} from '@angular/core';

import { Expression, CompoundExpression, NumberExpression, Operator } from '../../model/expression';
import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from '../expressionnodes/expressionnode.component';
import { GenericExpressionNodeComponent } from '../expressionnodes/genericexpressionnode/genericexpressionnode.component';
import { DOMLineSegment, getClientRectLocation, subtract as subDOMLocations } from '../../model/domgeometry';

@Component({
    moduleId: module.id,
    selector: 'expression-tree',
    templateUrl: 'expressiontree.component.html',
    styleUrls: ['expressiontree.component.css']
})
export class ExpressionTreeComponent implements AfterViewInit, AfterViewChecked {
    expression: Expression;
    levels: null[];
    connections: DOMLineSegment[] = [];
    private _connectionsInitialized = false;
    @ViewChild('rootExpression', {read: EXPRESSION_NODE_COMPONENT}) rootExpressionNode: ExpressionNodeComponent;
    @ViewChildren('levelAnchor', {read: ViewContainerRef}) levelViewContainers: QueryList<ViewContainerRef>;
    @ViewChild('nodeSpacer') nodeSpacerTemplate: TemplateRef<void>;
    @ViewChild('wrapper') wrapper: ElementRef;

    constructor(private _elementRef: ElementRef) {
        this.levels = [null];
        let subexpressions: Expression[] = [
            new NumberExpression(3), 
            new NumberExpression(8), 
            new NumberExpression(3), 
            new NumberExpression(8), 
            new NumberExpression(3), 
            new NumberExpression(8), 
            new NumberExpression(3), 
            new NumberExpression(8)
        ];
        let nextSubexpressions: Expression[] = [];
        while (subexpressions.length > 1) {
            for (let i = 0; i < subexpressions.length; i += 2) {
                let subexpression = new CompoundExpression(
                    subexpressions[i + 0], 
                    i % 2 == 0 ? Operator.ADD : Operator.SUBTRACT,
                    subexpressions[i + 1]
                )
                nextSubexpressions.push(subexpression);
            }
            subexpressions = nextSubexpressions;
            nextSubexpressions = [];
            this.levels.push(null);
        }

        this.expression = subexpressions[0];
    }

    private _tickThenInitializeConnections() {
        setTimeout(() => {
            this.connections = [];
            let hostRect = this.wrapper.nativeElement.getBoundingClientRect();
            let calculateSubgraphConnections = (subgraphRoot: ExpressionNodeComponent) => {
                let p0 = getClientRectLocation(subgraphRoot.nodeElementRef.nativeElement, 0.5, 1);
                p0 = subDOMLocations(p0, hostRect);
                subgraphRoot.childNodes.forEach((child: ExpressionNodeComponent) => {
                    let p1 = getClientRectLocation(child.nodeElementRef.nativeElement, 0.5, 0);
                    p1 = subDOMLocations(p1, hostRect);
                    this.connections.push(new DOMLineSegment(p0, p1));

                    calculateSubgraphConnections(child);
                })
            }
            calculateSubgraphConnections(this.rootExpressionNode);

            this._connectionsInitialized = true;
        }, 0)
    }

    private _tickThenBuildNodes() {
        window.setTimeout(() => {
            let levelViewContainers = this.levelViewContainers.toArray();
            let renderSubgraph = (subgraphRoot: ExpressionNodeComponent, level: number) => {
                let vc = levelViewContainers[level];
                if (vc.length >= 1) {
                    vc.createEmbeddedView(this.nodeSpacerTemplate);
                }
                vc.createEmbeddedView(subgraphRoot.nodeDivTemplate);
                subgraphRoot.childNodes.forEach((childNode: ExpressionNodeComponent) => {
                    renderSubgraph(childNode, level + 1);
                });
            }
            renderSubgraph(this.rootExpressionNode, 0);
        }, 0);
    }

    ngAfterViewInit() {
        this._tickThenBuildNodes();
    }

    ngAfterViewChecked() {
        if (!this._connectionsInitialized) {
            this._tickThenInitializeConnections();
            this._connectionsInitialized = true;
        }
    }
}
